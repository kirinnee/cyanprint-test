import {
  Cyan,
  GlobType,
  IDeterminism,
  IInquirer,
  StartTemplateWithLambda,
} from "@atomicloud/cyan-sdk";

StartTemplateWithLambda(
  async (i: IInquirer, d: IDeterminism): Promise<Cyan> => {
    const language = await i.select(
      "Language",
      ["English", "Spanish", "French", "German", "Italian"],
      "kirinnee/test/language",
      "The language to use for the template",
    );

    const name = await i.text(
      "Name",
      "kirinnee/test/name",
      "The name of the template",
    );
    const age = await i.text(
      "Age",
      "kirinnee/test/age",
      "The age of the template",
    );

    const food = await i.select(
      "Food",
      ["Pizza", "Burger", "Salad", "Noodles", "Sushi", "Pasta"],
      "kirinnee/test/food",
      "The food to use for the template",
    );
    const colors = await i.select(
      "Colors",
      ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"],
      "kirinnee/test/colors",
      "The colors to use for the template",
    );

    const vars = {
      language,
      name,
      age,
      food,
      colors,
    };

    return {
      processors: [
        {
          name: "cyan/default",
          files: [
            {
              root: "templates",
              glob: "**/*",
              type: GlobType.Template,
              exclude: [],
            },
          ],
          config: {
            vars,
            parser: {
              varSyntax: [
                ["let___", "___"],
                ["var___", "___"],
                ["// var___", "___"],
                ["<%", "%>"],
              ],
            },
          },
        },
      ],
      plugins: [],
    } as Cyan;
  },
);
