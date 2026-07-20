export function Legend() {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-ink-soft">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden>
          <circle r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />
        </svg>
        Person
      </div>
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden>
          <rect
            x={-6}
            y={-6}
            width={12}
            height={12}
            transform="rotate(45)"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth={1.4}
          />
        </svg>
        Organization
      </div>
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden>
          <rect
            x={-6}
            y={-6}
            width={12}
            height={12}
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth={1.4}
          />
        </svg>
        Account / entity
      </div>
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden>
          <path
            d="M 0 -7 L 7 5 L -7 5 Z"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth={1.4}
          />
        </svg>
        Place
      </div>
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden>
          <circle
            r="6"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth={1.4}
            strokeDasharray="2 2"
          />
        </svg>
        Event
      </div>
      <div className="flex items-center gap-2">
        <svg width="24" height="12" aria-hidden>
          <line x1="0" y1="6" x2="24" y2="6" stroke="var(--ink-soft)" strokeWidth={1.2} />
        </svg>
        Confirmed link
      </div>
      <div className="flex items-center gap-2">
        <svg width="24" height="12" aria-hidden>
          <line
            x1="0"
            y1="6"
            x2="24"
            y2="6"
            stroke="var(--ink-soft)"
            strokeWidth={1.2}
            strokeDasharray="2 4"
          />
        </svg>
        Alleged link
      </div>
    </div>
  );
}
