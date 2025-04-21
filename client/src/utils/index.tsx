import { Link } from "react-router-dom";
import parse from "html-react-parser";

/**
 * Parses mentions (e.g., @username) and converts them into clickable links.
 * Also parses the remaining text for HTML content.
 *
 * @param text - The text to parse.
 * @returns Parsed JSX content.
 */
export const parseMentions = (text: string, id: string) => {
  const mentionRegex = /@(\w+)/g; // Matches @username
  return text.split(mentionRegex).map((part, index) => {
    if (index % 2 === 1) {
      // Odd indices are mentions
      return (
        <Link key={index} to={`/user/${id}`} className="text-primary">
          @{part}
        </Link>
      );
    }
    return parse(part); // Parse non-mention text using html-react-parser
  });
};
