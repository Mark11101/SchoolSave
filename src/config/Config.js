const envConfig = {
  baseUrl: 'https://save-school.sandlabs.ru',
}

class Config {
  constructor(data) {
    this.baseUrl = data.baseUrl;
  }

  set(key, value) {
    if (value) {
      (this[key]) = value;
    }
  }
}

const config = new Config(envConfig);

export default config
