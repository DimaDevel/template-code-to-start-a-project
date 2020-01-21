const { Client, Notification } = require('onesignal-node');

class Push {
  /**
   * One-signal init method
   * @param {{ userAuthKey:string, appAuthKey:string, appId:string }} param0
   */
  setOptions({ userAuthKey, appAuthKey, appId }) {
    this.userAuthKey = userAuthKey;
    this.appAuthKey = appAuthKey;
    this.appId = appId;
  }

  /**
   * returns one-signal client by keys was init in setOptions method
   */
  getClient() {
    if (!this.client) {
      this.client = new Client({
        userAuthKey: this.userAuthKey,
        app: {
          appAuthKey: this.appAuthKey,
          appId: this.appId
        }
      });
    }

    return this.client;
  }

  /**
   * method for send push notification to devices indicated in devicesIds array
   * @param {*} contents
   * @param {*} headings
   * @param {*} data
   * @param {Array} devicesIds
   */
  async sendNotification(contents, headings, data, devicesIds) {
    const message = new Notification({
      contents,
      headings,
      data,
      include_player_ids: devicesIds
    });

    return this.getClient().sendNotification(message);
  }
}

module.exports = new Push();
