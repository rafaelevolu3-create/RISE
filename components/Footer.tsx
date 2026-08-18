const sideName = process.env.NEXT_PUBLIC_SIDE_NAME || "RISE";

export function Footer() {
  return (
    <footer className="border-t border-surface-border/70 py-6 text-center text-xs text-ink-muted">
      {sideName} STATS &middot; dados sincronizados direto da planilha de controle da alianca &middot;{" "}
      Lineage 2 Reborn
    </footer>
  );
}
