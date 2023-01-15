module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/app/Http/controllers',
        '@routes': './src/routes',
        '@repositories': './src/app/Http/Repositories',
        '@providers': './src/app/Providers',
        '@exceptions': './src/app/Exceptions',
        '@middlewares': './src/app/Http/middlewares',
        '@dtos': './src/app/Http/dtos',
        "@database": "./src/database",
        "@configs": "./src/config",
        "@resrouces": "./src/resources"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
