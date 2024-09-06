import { readdirSync } from 'fs';
import { dirname, basename, resolve, extname } from 'path';
import { ConsoleStatusHandler } from '../console.status.handler';
import { secretConfigService } from '../secret-config.service';

export const getFilesByDir = async (folderName: string, toHandler: string): Promise<any[]> => {
  const __fileName = process.argv[1];
  const __dirname = dirname(__fileName);

  const enviromentPaths = {
    events: [
      { enviroment: 'development', route: resolve(__dirname, '../src/events', folderName) },
      { enviroment: 'production', route: resolve(__dirname, '../dist/events', folderName) }
    ],
    commands: [
      { enviroment: 'development', route: resolve(__dirname, '../src/commands', folderName) },
      { enviroment: 'production', route: resolve(__dirname, '../dist/commands', folderName) }
    ]
  };

  const paths = enviromentPaths[toHandler];

  if (!paths) {
    new ConsoleStatusHandler('💽', 'No valid handler specified, must be commands or events', 'error');
    return;
  };

  const getFilePath = () => {
    const isProduction = secretConfigService.isProduction;

    const resolvePath = (enviroment: string) => {
      const enviromentPath = paths.find(path => path.enviroment === enviroment);
      return enviromentPath.route;
    };

    return isProduction ? resolvePath('production') : resolvePath('development');
  }

  const getAllFiles = (dirPath: string): string[] => {
    const entries = readdirSync(dirPath, { withFileTypes: true });

    const files = entries
      .filter(file => !file.isDirectory())
      .filter(file => extname(file.name) === '.js')
      .map(file => resolve(dirPath, file.name));

    const folders = entries.filter(folder => folder.isDirectory());

    for (const folder of folders) {
      const folderPath = resolve(dirPath, folder.name);
      files.push(...getAllFiles(folderPath));
    }

    return files;
  };

  const handler = getFilePath();

  const allFiles = getAllFiles(handler);

  const fileCollection = [];

  for (const filePath of allFiles) {
    try {
      const fileContent = await import(filePath);
      fileCollection.push(fileContent.default);
      const fileName = basename(filePath);
      new ConsoleStatusHandler('💽', `${fileName} - loaded`, 'ok');
    } catch (error) {
      new ConsoleStatusHandler('💽', `There was an error loading ${filePath} file - ${error}`, 'error');
    }
  }

  return fileCollection;
};
