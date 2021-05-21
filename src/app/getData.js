const handleErrors = (response) => {
  if (!response.ok) {
    console.log(response);
    throw Error(response.statusText);
  }
  return response.json();
};

const processData = (rawData) => {
  // extract TK1_ object
  const tk1_obj = rawData.current?.data?.TK1 || {};

  // create array for TK1_ entries
  const tk1_entries = [];

  // loop through tk1_obj data and return entries that begin with tk1_

  Object.keys(tk1_obj).forEach((key) => {
    if (key.startsWith("TK1_")) {
      tk1_entries.push([key, tk1_obj[key].times, tk1_obj[key].values]);
    }
  });
  console.log(tk1_entries);
  return tk1_entries;
};

const getData = async () => {
  try {
    return await fetch(
      "https://reference.intellisense.io/thickenernn/v1/referencia",
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then(handleErrors)
      .then((response) => {
        console.log(response);
        // parse response
        return processData(response);
      });
  } catch (err) {
    console.log(err);
  }
};

export default getData;
