import { ReactNode } from "react";
import { ImCross } from "react-icons/im";
import { BsCircle } from "react-icons/bs";

import { WORD_BANK } from "../WordBank";
import { CardRole, Optional, Word, WordCard } from "../types/types";
import { Theme } from "@emotion/react";

const get25RandomWords = (wordBank: Array<Word>): Array<Word> =>
  wordBank.sort(() => Math.random() - 0.5).slice(0, 25);

const assignRoles = (words: Array<Word>): Array<WordCard> => {
  const assigned = words.map((word, index) => {
    return {
      word,
      role:
        index <= 8
          ? ("red" as const)
          : index > 8 && index <= 16
          ? ("blue" as const)
          : index > 16 && index < 24
          ? ("neutral" as const)
          : ("black" as const),
    };
  });

  return assigned.sort(() => Math.random() - 0.5);
};

// export const roleToBackgroundColorMap: { [key in CardRole]: string } = {
//   neutral: "#efefef",
//   blue: "#7acaff",
//   red: "#ff5d56",
//   black: "#000000",
// };

export const mapRoleToBackgroundColor = (
  role: CardRole,
  theme: Theme
): string => {
  const roleToBackgroundColorMap: { [key in CardRole]: string } = {
    neutral: theme.colors.card.neutral,
    blue: theme.colors.card.blue,
    red: theme.colors.card.red,
    black: theme.colors.card.black,
  };

  return roleToBackgroundColorMap[role];
};

// export const mapRoleToForegroundColor = (
//   role: CardRole,
//   theme: Theme
// ): string => {
//   const roleToForegroundColorMap: { [key in CardRole]: string } = {
//     neutral: theme.colors.card.text,
//     blue: theme.colors.card.text,
//     red: theme.colors.card.text,
//     black: theme.colors.card.inversedText,
//   };

//   return `${roleToForegroundColorMap[role]}33`;
// };

// export const roleToForegroundColorMap: { [key in CardRole]: string } = {
//   neutral: "#000000",
//   blue: "#000000",
//   red: "#000000",
//   black: "#ffffff",
// };

export const roleToSignMap: { [key in CardRole]: Optional<ReactNode> } = {
  black: <ImCross />,
  red: <BsCircle />,
  neutral: null,
  blue: <BsCircle />,
};

export const parseRolesFromCSVString = (text: string): Array<CardRole> => {
  return text.split(",") as Array<CardRole>;
};

export const getNewWordCardSet = () => assignRoles(get25RandomWords(WORD_BANK));
