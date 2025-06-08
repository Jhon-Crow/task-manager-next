(async () => {
  try {
    throw null;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
})();
