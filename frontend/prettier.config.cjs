/** @type {import('prettier').Config} */
module.exports = {
    endOfLine: 'lf',
    semi: false,
    useTabs: false,
    singleQuote: true,
    arrowParens: 'avoid',
    tabWidth: 2,
    trailingComma: 'none',
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '^(next/(.*)$)|^(next$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^types$',
        '^@/lib/(.*)$',
        '^@/hooks/(.*)$',
        '^@/components/ui/(.*)$',
        '^@/components/(.*)$',
        '^@/app/(.*)$',
        '',
        '^[./]'
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderBuiltinModulesToTop: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderMergeDuplicateImports: true,
    importOrderCombineTypeAndValueImports: true
}