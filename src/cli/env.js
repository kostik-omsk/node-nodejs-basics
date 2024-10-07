const prefix = 'RSS_';

const parseEnv = () => {
  let rssPrefix = [];
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix)) {
      rssPrefix.push(`${key}=${value}`);
    }
  }

  console.log(rssPrefix.join('; '));
};

parseEnv();
