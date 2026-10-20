
const STORAGE_KEY = "recall-data";
const CURRENT_VERSION = 1;

export function saveData(data) {
  const versionedData = {
    version: CURRENT_VERSION,
    data: data
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(versionedData)
    );

    return true;
  } catch (error) {
    console.error("Could not save Recall data:", error);
    return false;
  }
}

export function loadData() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (savedValue === null) {
      return null;
    }

    const parsedValue = JSON.parse(savedValue);

    if (parsedValue.version !== CURRENT_VERSION) {
      console.warn("Recall data version is different.");
      return null;
    }

    return parsedValue.data;
  } catch (error) {
    console.error("Could not load Recall data:", error);
    return null;
  }
}
