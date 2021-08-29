/** Returns a random adorable animal emoji.
 *
 * @param emoji: list of emoji choices (defaults to cute animals)
 * @param className: passed through the rendered element
 * @returns {JSX.Element}
 *
 * This is the greatest React component ever written.
 *
 */

function AnimalEmoji(
  {
    emoji = "😺🙊🐶🦊🐱🦁🐯🦄🐮🐷🐭🐹🐰🦔🐻🐨🐼🐥🐦🐧🐸🐲🐙",
    className = "",
  }) {
  const emojiChoices = Array.from(emoji);

  function choice(items) {
    return items[Math.floor(Math.random() * items.length)]
  }

  return <span className={ className }>{ choice(emojiChoices) }</span>
}

export default AnimalEmoji;
