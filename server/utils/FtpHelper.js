const FtpClient = require('ftp');

const ftpConfig = {
  host: 'ftp.keycdn.com',
  port: 21,
  secure: true,
  user: 'sidharth',
  password: 'Sidharth.123' // TODO hide me
};

const baseDestinationPath = '/digital/';

export default class FtpHelper {


  /**
   * static - description
   *
   * @param  {type} sourceFilePath description
   * @param  {type} callback       description
   * @return {type}                description
   */
  static uploadFile(sourceFile, targetPath, callback) {
    console.info(sourceFile);
    const c = new FtpClient();
    c.on('ready', () => {
      c.put(sourceFile, baseDestinationPath + targetPath, (err) => {
        callback(err);
        c.end();
      });
    });
    c.connect(ftpConfig);
  }


  /**
   * static - description
   *
   * @param  {type} targetFilePath description
   * @param  {type} callback       description
   * @return {type}                description
   */
  static deleteFile(targetFilePath, callback) {
    const c = new FtpClient();
    c.on('ready', () => {
      c.delete(baseDestinationPath + targetFilePath, (err) => {
        callback(err);
        c.end();
      });
    });
    c.connect(ftpConfig);
  }

}
