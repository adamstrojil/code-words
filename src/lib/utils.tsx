import { Theme } from "@emotion/react";
import { ReactNode } from "react";
import { BsCircle } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import { WORD_BANK } from "../WordBank";
import { CardRole, Optional, TeamColor, Word, WordCard } from "../types/types";
import {
  URL_DATA_MAP_PAGE_LINK,
  QR_LINK_DATA_PARAM_NAME,
} from "../features/Game/constants";

const get25RandomWords = (wordBank: Array<Word>): Array<Word> =>
  wordBank.sort(() => Math.random() - 0.5).slice(0, 25);

const assignRoles = (words: Array<Word>): Array<WordCard> => {
  const assigned = words.map((word, index) => {
    return {
      id: crypto.randomUUID(),
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

export const roleToSignMap: { [key in CardRole]: Optional<ReactNode> } = {
  black: <ImCross />,
  red: <BsCircle />,
  neutral: null,
  blue: <BsCircle />,
};

export const parseRolesFromCSVString = (text: string): Array<CardRole> => {
  const parsedValues = text.split(",") as Array<CardRole>;
  const acceptedValues: Array<CardRole> = ["red", "blue", "black", "neutral"];

  const wasParsingSuccessful = parsedValues.every((value) =>
    acceptedValues.includes(value)
  );
  return wasParsingSuccessful ? parsedValues : [];
};

export const pickRandomly = <T,>(option1: T, option2: T): T =>
  Math.random() > 0.5 ? option1 : option2;

export const getNewWordCardSet = () => assignRoles(get25RandomWords(WORD_BANK));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTeamColor(value: any): value is TeamColor {
  return value === "red" || value === "blue";
}

export const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

export const buildLinkToURLDataMap = (encodedRoles: string) => {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;

  return `${baseUrl}#${URL_DATA_MAP_PAGE_LINK}?${QR_LINK_DATA_PARAM_NAME}=${encodedRoles}`;
};
