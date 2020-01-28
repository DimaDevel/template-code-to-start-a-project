const { Client } = require('postmark');
// сut one array on many arrays(chunks) by fixed element length
const chunk = (array, length) => {
  const chunks = [];
  let chunk = [];
  for (let i = 0; i < array.length; i += 1) {
    if (chunk.length >= length) {
      chunks.push(chunk);
      chunk = [];
    }
    chunk.push(array[i]);
  }

  if (chunk.length) {
    chunks.push(chunk);
  }
  return chunks;
};

class Email {
  /**
   * Setup the postmark private key and from values
   * @param {{key:string, from:string}} param0
   */
  setOptions({ key, from }) {
    this.setKey(key);
    this.setFrom(from);
  }

  setKey(key) {
    this.key = key;
  }

  setFrom(from) {
    this.from = from;
  }

  /**
   * method for getting postmark client by private key
   */
  getClient() {
    if (!this.client) {
      this.client = (new Client(this.key));
    }

    return this.client;
  }

  /**
   * Method for send email message by already exists template and replace vars keys in template by vars values
   * @param {{from:string, template:string, to:string, vars:object}} param0
   */
  async sendEmailWithTemplate({
    from: CustomFrom = null,
    template: TemplateId,
    to: To,
    vars: TemplateModel,
  }) {
    const From = CustomFrom || this.from;

    return this.getClient()
      .sendEmailWithTemplate({
        From,
        TemplateId,
        To,
        TemplateModel,
      });
  }

  /**
   * Method for send multiple email messages by already exists template and replace vars keys in template by vars values
   * @param {{from:string, template:string, to:string, vars:object}} param0
   */
  async sendEmailBatchWithTemplates(messages) {
    const formattedMessages = messages.map((message) => ({
      From: message.from || this.from,
      TemplateId: message.template,
      To: message.to,
      TemplateModel: message.vars,
    }));

    // split array into parts of 500 messages (Postmark limit on batch sending)
    const chunks = chunk(formattedMessages, 500);
    const promises = chunks.map(async (chunk) => this.getClient().sendEmailBatchWithTemplates(chunk));
    return Promise.all(promises);
  }
}

module.exports = new Email();
