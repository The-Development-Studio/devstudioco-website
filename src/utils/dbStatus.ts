// Database connection and table status utility

interface TableStatus {
  testimonials: boolean;
  team: boolean;
  projects: boolean;
  logos: boolean;
  clients: boolean;
  contactForms: boolean;
  newsletter: boolean;
}

interface DatabaseStatus {
  connected: boolean;
  allTablesExist: boolean;
  missingTables: string[];
  tableStatus: TableStatus;
  setupRequired: boolean;
  error: string | null;
}

let cachedStatus: DatabaseStatus | null = null;
let lastCheckTime = 0;
const CACHE_DURATION = 30000; // 30 seconds cache

export async function checkDatabaseStatus(): Promise<DatabaseStatus> {
  // Return cached result if recent
  const now = Date.now();
  if (cachedStatus && (now - lastCheckTime) < CACHE_DURATION) {
    return cachedStatus;
  }

  const status: DatabaseStatus = {
    connected: false,
    allTablesExist: false,
    missingTables: [],
    tableStatus: {
      testimonials: false,
      team: false,
      projects: false,
      logos: false,
      clients: false,
      contactForms: false,
      newsletter: false,
    },
    setupRequired: false,
    error: null,
  };

  try {
    // Check if server is reachable
    const { projectId, publicAnonKey } = await import('./supabase/info');
    const healthResponse = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76/health`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );

    status.connected = healthResponse.ok;

    if (!status.connected) {
      status.error = 'Server not reachable';
      logStatus(status);
      cachedStatus = status;
      lastCheckTime = now;
      return status;
    }

    // Try to import API functions
    const { testimonialsAPI, teamAPI, projectsAPI, logosAPI } = await import('./api');

    // Check each table by attempting to fetch
    const checks = await Promise.allSettled([
      testimonialsAPI.getAll().then(() => ({ table: 'testimonials', success: true })),
      teamAPI.getAll().then(() => ({ table: 'team', success: true })),
      projectsAPI.getAll().then(() => ({ table: 'projects', success: true })),
      logosAPI.getAll().then(() => ({ table: 'logos', success: true })),
    ]);

    const tableNames = ['testimonials', 'team', 'projects', 'logos'] as const;
    const tableFullNames = [
      'testimonials_b9482a76',
      'team_members_b9482a76', 
      'projects_b9482a76',
      'client_logos_b9482a76'
    ];

    checks.forEach((result, index) => {
      const tableName = tableNames[index];
      const fullTableName = tableFullNames[index];
      
      if (result.status === 'fulfilled') {
        status.tableStatus[tableName] = true;
      } else {
        const error = result.reason;
        
        // Check if it's a table not found error
        if (isDatabaseSetupError(error)) {
          status.missingTables.push(fullTableName);
          status.setupRequired = true;
        } else {
          // Other error - log but don't mark as setup required
          console.error(`Error checking ${tableName}:`, error);
        }
      }
    });

    // Determine if all essential tables exist
    status.allTablesExist = 
      status.tableStatus.testimonials &&
      status.tableStatus.team &&
      status.tableStatus.projects &&
      status.tableStatus.logos;

    if (status.setupRequired) {
      status.error = 'Database tables not found. Please run setup SQL.';
    }

  } catch (error) {
    console.error('Error checking database status:', error);
    status.error = error instanceof Error ? error.message : 'Unknown error';
    status.setupRequired = true;
    status.missingTables = [
      'testimonials_b9482a76',
      'team_members_b9482a76',
      'projects_b9482a76',
      'client_logos_b9482a76'
    ];
  }

  // Cache the result
  cachedStatus = status;
  lastCheckTime = now;

  // Log status to console
  logStatus(status);

  return status;
}

function logStatus(status: DatabaseStatus) {
  if (status.connected && status.allTablesExist) {
    console.log('%c✅ Database Ready', 'color: #22c55e; font-weight: bold; font-size: 14px;');
    console.log('%cAll tables exist and are accessible.', 'color: #22c55e;');
  } else if (status.connected && status.setupRequired) {
    console.log('%c⚠️ Database Setup Required', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%cMissing tables:', 'color: #f59e0b;', status.missingTables);
    console.log('%c📋 Action Required:', 'color: #3b82f6; font-weight: bold;');
    console.log('%c1. Open Supabase Dashboard → SQL Editor', 'color: #3b82f6;');
    console.log('%c2. Copy contents from /QUICK_DATABASE_SETUP.sql', 'color: #3b82f6;');
    console.log('%c3. Paste and run the SQL script', 'color: #3b82f6;');
    console.log('%c4. Refresh this page', 'color: #3b82f6;');
    console.log('%cSee /SETUP_REQUIRED.md for detailed instructions', 'color: #8b5cf6; text-decoration: underline;');
  } else if (!status.connected) {
    console.log('%c❌ Database Not Connected', 'color: #ef4444; font-weight: bold; font-size: 14px;');
    console.log('%cError:', 'color: #ef4444;', status.error);
  }
}

export function clearDatabaseStatusCache() {
  cachedStatus = null;
  lastCheckTime = 0;
}

export function isDatabaseSetupError(error: any): boolean {
  if (!error) return false;
  
  const message = error.message || '';
  const code = error.code || '';
  
  return (
    code === 'PGRST205' ||
    message.includes('Could not find the table') ||
    message.includes('schema cache') ||
    message.includes('PGRST205')
  );
}

// Auto-check on import in development
if (typeof window !== 'undefined') {
  checkDatabaseStatus();
}
