export function CatalogueIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
      <g
        stroke="#09090B"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        clip-path="url(#a)"
      >
        <path d="M12 6.667H9.333a2.667 2.667 0 0 0-2.666 2.666v16A2.667 2.667 0 0 0 9.333 28h13.334a2.667 2.667 0 0 0 2.666-2.667v-16a2.667 2.667 0 0 0-2.666-2.666H20" />
        <path d="M12 6.667A2.667 2.667 0 0 1 14.667 4h2.666a2.667 2.667 0 1 1 0 5.333h-2.666A2.667 2.667 0 0 1 12 6.667ZM12 16h.013M17.333 16H20M12 21.333h.013M17.333 21.333H20" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TicketRegistration() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
      <g
        stroke="#09090B"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        clip-path="url(#a)"
      >
        <path d="M4 10.667v5.562c0 .707.281 1.386.781 1.886l7.614 7.613a3.213 3.213 0 0 0 4.544 0l4.789-4.79a3.213 3.213 0 0 0 0-4.543L14.115 8.78c-.5-.5-1.178-.78-1.886-.781H6.667A2.667 2.667 0 0 0 4 10.667Z" />
        <path d="m24 25.333 2.123-2.122a6.427 6.427 0 0 0 0-9.088L20 8M9.333 13.333H9.32" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-search"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  );
}

export function EyeOffIcon({ handleOnClick = null }) {
  return (
    <svg
      onClick={handleOnClick}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
      <path d="M3 3l18 18" />
    </svg>
  );
}
export function EyeIcon({ handleOnClick = null }) {
  return (
    <svg
      onClick={handleOnClick}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-eye"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  );
}

export function Orders() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
      <g
        stroke="#09090B"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        clip-path="url(#a)"
      >
        <path d="M8.441 10.667h15.12a2.668 2.668 0 0 1 2.635 3.072l-1.673 10.869A4 4 0 0 1 20.568 28h-9.136a4 4 0 0 1-3.953-3.392l-1.674-10.87a2.667 2.667 0 0 1 2.636-3.071Z" />
        <path d="M12 14.667V8a4 4 0 1 1 8 0v6.667" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
  
}

