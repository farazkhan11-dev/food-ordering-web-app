import { useState } from 'react';

export default function StarRating({ rating, interactive = false, onRate }) {

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);


  // DISPLAY RATING 
  let displayRating;
  if (interactive) {
    if (hovered) {
      displayRating = hovered;
    } else if (selected) {
      displayRating = selected;
    } else {
      displayRating = rating;
    }
  } else {
    displayRating = rating;
  }

  // HANDLE STAR CLICK 
  // Only works if interactive mode is on
  // Saves the clicked star and calls onRate if provided
  const handleClick = (star) => {
    if (!interactive) return;
    setSelected(star);
    if (onRate) {
      onRate(star);
    }
  };

  
  // Only highlight star on hover if interactive mode is on
  const handleMouseEnter = (star) => {
    if (interactive) {
      setHovered(star);
    }
  };

  // Reset hover highlight when mouse leaves
  const handleMouseLeave = () => {
    if (interactive) {
      setHovered(0);
    }
  };
  
  // Show selected rating if user clicked a star
  // Otherwise show the original rating
  let numericLabel;
  if (interactive) {
    if (selected) {
      numericLabel = `${selected}.0`;
    } else {
      numericLabel = rating.toFixed(1);
    }
  } else {
    numericLabel = rating.toFixed(1);
  }

  //  STAR BUTTON STYLE
  // Clickable and grows on hover if interactive
  // Not clickable if just displaying
  let starButtonStyle;
  if (interactive) {
    starButtonStyle = 'text-lg transition-transform duration-100 cursor-pointer hover:scale-125';
  } else {
    starButtonStyle = 'text-lg transition-transform duration-100 cursor-default';
  }

  // render
  return (
    <div className="flex items-center gap-0.5">

      {/* Loop through stars 1 to 5 */}
      {[1, 2, 3, 4, 5].map((star) => {

        // Is this star fully filled?
        const filled = star <= displayRating;

        // Is this star half filled?
        const halfFilled = !filled && star - 0.5 <= displayRating;

        // Star color based on filled / half filled / empty
        let starColor;
        if (filled) {
          starColor = 'text-yellow-400';
        } else if (halfFilled) {
          starColor = 'text-yellow-300';
        } else {
          starColor = 'text-gray-300';
        }

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={starButtonStyle}
          >
            <span className={starColor}>★</span>
          </button>
        );
      })}

      {/* Numeric rating label */}
      <span className="ml-1.5 text-sm font-semibold text-gray-600">
        {numericLabel}
      </span>

    </div>
  );
}