import chokidar from 'chokidar';
import fs from 'node:fs';
import path from 'node:path';

const directoriesToWatch = ['dto', 'services', 'controllers'];

// 生成 index.ts 文件的函数
const generateIndexFile = (dir: string) => {
  const directoryPath = path.join(process.cwd(), 'src', dir);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }

    let exports = '';
    for (const file of files) {
      const extname = path.extname(file);
      const basename = path.basename(file, extname);

      // 排除自身和非 .ts 文件
      if (file !== 'index.ts' && extname === '.ts') {
        exports += `export * from './${basename}';\n`;
      }
    }

    // 将导出的内容写入 index.ts
    fs.writeFile(path.join(directoryPath, 'index.ts'), exports, (err) => {
      if (err) {
        return console.log(`Unable to write to index.ts: ${err}`);
      }
      console.log('index.ts has been generated successfully!');
    });
  });
};

// 初次生成
for (const dir of directoriesToWatch) {
  generateIndexFile(dir);
}

// 使用 chokidar 监控当前目录下的 .ts 文件
const watcher = chokidar.watch(
  directoriesToWatch.map((dir) => `${process.cwd()}/src/${dir}`),
  {
    // 忽略 index.ts 文件
    // 忽略 @generated 目录
    ignored: /index.ts|@generated/,
    persistent: true,
  },
);

// 监听文件的添加、修改和删除
watcher
  .on('add', (path) => {
    console.log(`${path} has been added, regenerating index.ts...`);
    const dir = path.split('/').slice(-2, -1)[0]; // 获取目录名
    generateIndexFile(dir);
  })
  .on('change', (path) => {
    console.log(`${path} has been changed, regenerating index.ts...`);
    const dir = path.split('/').slice(-2, -1)[0]; // 获取目录名
    generateIndexFile(dir);
  })
  .on('unlink', (path) => {
    console.log(`${path} has been removed, regenerating index.ts...`);
    const dir = path.split('/').slice(-2, -1)[0]; // 获取目录名
    generateIndexFile(dir);
  });
