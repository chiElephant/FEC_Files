const fs = require('fs').promises;
const path = require('path');

class JsonDataHandler {
  constructor(filename = 'data.json') {
    this.filePath = path.join(
      '/Users/riccardopirruccio/Desktop/Resume_Projects/Atelier/src/data',
      filename
    );
  }

  async storeData(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      throw new Error(`Error while storing data: ${err}`);
    }
  }

  async retrieveData() {
    if (await this.checkIfDataExists()) {
      try {
        const rawData = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(rawData);
      } catch (err) {
        throw new Error(`File read error: ${err}`);
      }
    } else {
      throw new Error('File does not exist.');
    }
  }

  async checkIfDataExists() {
    try {
      await fs.access(this.filePath);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = JsonDataHandler;
