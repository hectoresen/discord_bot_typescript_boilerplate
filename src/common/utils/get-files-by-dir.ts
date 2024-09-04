import { join } from 'path';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ConsoleStatusHandler } from '../console.status.handler';

export const getFilesByDir = async (folderName: string, toHandler: string): Promise<any[]> => {
  const __fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(__fileName);
  const eventsPath = `../../events/${folderName}`;
  const commandsPatch = `../../commands/${folderName}`;

  const handler = (toHandler === 'events') ? eventsPath : commandsPatch;

  const files = readdirSync(
    join(__dirname, handler),
    { withFileTypes: true, recursive: true }
  )
    .filter(file => !file.isDirectory());

  const fileCollection = [];

  for (const file of files) {
    const filePath = join(file.path, `${file.name}`);

    const fileContent = await import(`file://${filePath}`);

    try {
      fileCollection.push(fileContent.default);
      new ConsoleStatusHandler('📂', `${file.name} - loaded`, 'ok');
    } catch (error) {
      new ConsoleStatusHandler('📂', `There was an error loading ${file.name} file - ${error}`, 'error');
    }
  }

  return fileCollection;
};