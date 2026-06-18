import Icon from "../ui/Icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => (
  <Dialog open onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Help &amp; Resources</DialogTitle>
      </DialogHeader>
      {[
        { icon: "video",       label: "Walkthrough Video",  desc: "1–2 min overview of this page" },
        { icon: "reports",     label: "Documentation",      desc: "Step-by-step user guide for this page" },
        { icon: "analytics",   label: "Knowledge Base",     desc: "Wiki articles and best practices" },
        { icon: "performance", label: "Training Institute", desc: "Self-guided learning portal with exercises" },
      ].map((item) => (
        <button
          key={item.label}
          className="flex gap-3 items-center py-3 border-b border-slate-100 w-full text-left hover:bg-slate-50 rounded px-1 transition-colors"
          onClick={onClose}
        >
          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
            <Icon name={item.icon} size={18} color="#64748b" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{item.label}</div>
            <div className="text-xs text-slate-500">{item.desc}</div>
          </div>
        </button>
      ))}
    </DialogContent>
  </Dialog>
);

export default HelpModal;
