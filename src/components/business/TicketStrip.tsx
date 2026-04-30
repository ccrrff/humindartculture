interface Ticket {
  year: string;
  month: string;
  title: string;
  venue: string;
}

interface Props {
  tickets: Ticket[];
}

export default function TicketStrip({ tickets }: Props) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      {tickets.map((ticket, i) => (
        <div key={i} className="flex rounded-xl overflow-hidden border border-white/60">
          <div className="bg-[#1a1a1c] text-white flex flex-col items-center justify-center px-3 py-2 min-w-[52px]">
            <span className="text-[9px] font-medium opacity-60 leading-none tracking-wide">{ticket.year}</span>
            <span className="text-[18px] font-extrabold leading-none mt-0.5">{ticket.month}</span>
          </div>
          <div className="flex-1 bg-white/45 flex flex-col justify-center px-3 py-2 border-l-2 border-dashed border-[#1a1a1c]/20">
            <p className="text-[12px] font-semibold text-[var(--text-main)] leading-snug">{ticket.title}</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{ticket.venue}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
