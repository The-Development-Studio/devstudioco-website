import { Globe, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLocale } from '../contexts/LocaleContext';

export function LocaleSelector() {
  const {
    currency,
    setCurrency,
    availableCurrencies,
    language,
    setLanguage,
    availableLanguages,
    t,
  } = useLocale();

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.code.toUpperCase()}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Language / भाषा</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={language === lang.code ? 'bg-accent' : ''}
            >
              <div className="flex flex-col">
                <span>{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Currency Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
          <DollarSign className="w-4 h-4" />
          <span className="hidden sm:inline">{currency}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t('currency')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableCurrencies.map((curr) => (
            <DropdownMenuItem
              key={curr.currency}
              onClick={() => setCurrency(curr.currency)}
              className={currency === curr.currency ? 'bg-accent' : ''}
            >
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">
                  <span>{curr.currency}</span>
                  <span className="text-xs text-muted-foreground">{curr.name}</span>
                </div>
                <span className="text-muted-foreground">{curr.symbol}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
