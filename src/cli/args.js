const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsValues = args.reduce((acc, arg, i) => {
    if (arg.startsWith('--') && args[i + 1]) {
      return [...acc, `${arg} is ${args[i + 1]}`];
    }else{
      return acc;
    }
  }, []);

  console.log(argsValues.join(', '));
};

parseArgs();
