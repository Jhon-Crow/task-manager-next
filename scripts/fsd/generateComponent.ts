import { FSDLayer } from "./types";
import { layers } from "./consts";
import { createSharedComponent } from "./generate/createSharedComponent";
import { createComponent } from "./generate/createComponent";

async function main() {
  const [layer, component] = process.argv.slice(2, 4) as [FSDLayer, string];
  const isReduxSlice = process.argv.slice(4).includes("-R");

  if (!layers.includes(layer)) {
    throw new Error(`${layer} не является: ` + layers.join(" "));
  }

  if (!component || !/^[a-z$](?:[a-z-$]*[a-z$])?\d*$/.test(component)) {
    throw new Error(`${component} не является допустимым именем компонента`);
  }

  const isShared = layer === "shared";

  const rootDir = process.cwd();

  try {
    if (isShared) {
      await createSharedComponent(component, rootDir);
    } else {
      await createComponent(layer, component, rootDir);
      if (isReduxSlice) {
      }
    }
    console.log(`${layer} компонент ${component} успешно создан!`);
  } catch (e) {
    if (
      typeof e === "object" &&
      e !== null &&
      "errno" in e &&
      e.errno === -17
    ) {
      console.log(`ОШИБКА!: ${component} уже создан!`.toUpperCase());
    } else {
      console.error(e);
    }
    process.exit(1);
  }
  console.log(123);
}

main();
