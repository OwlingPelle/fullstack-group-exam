import type { SVGProps } from "react";

// Vi har lagt till 'home' i listan över giltiga ikoner
export type IconName = "cart" | "menu" | "user" | "home" | "planet" | "lock" | "arrow-left" | "remove";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  if (name === "planet") {
    return (
      <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <clipPath id="planet-icon-clip">
            <circle cx="110" cy="82" r="64" />
          </clipPath>
        </defs>
        <g clipPath="url(#planet-icon-clip)">
          <circle cx="110" cy="82" r="64" className="planet-base" />
          <path
            d="M39 67 C48 37 76 18 110 18 C145 18 170 39 181 68 L181 83 L39 83 Z"
            className="planet-stripe-gold"
          />
          <path
            d="M35 76 C64 67 87 72 111 76 C139 81 164 76 185 63 L180 111 C158 127 135 139 110 140 C79 140 52 122 39 100 Z"
            className="planet-stripe-red"
          />
        </g>
        <ellipse
          cx="110"
          cy="82"
          rx="91"
          ry="15"
          className="planet-ring"
          transform="rotate(-12 110 82)"
        />
      </svg>
    );
  }

  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    ...props,
  };

  if (name === "cart") {
    return (
      <svg {...sharedProps}>
        <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L22 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
    );
  }

  if (name === "remove") {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      fill="#e3e3e3"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M7,21q-0.82,0-1.41-0.59T5,19V6H4V4H9V3h6V4h5V6H19V19q0,0.82-0.59,1.41T17,21H7ZM17,6H7V19H17V6ZM9,17h2V8H9v9Zm4,0h2V8H13v9ZM7,6V19V6Z" />
    </svg>
  );
}

  if (name === "menu") {
    return (
      <svg {...sharedProps}>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }

  // Här lägger vi till den nya Home-ikonen
  if (name === "home") {
    return (
      <svg {...sharedProps}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg {...sharedProps}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  if (name === "arrow-left") {
    return (
      <svg {...sharedProps}>
        <path d="M15 5l-7 7 7 7" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export default Icon;
