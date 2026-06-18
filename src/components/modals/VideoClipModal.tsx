import Icon from "../ui/Icon";
import { VideoClipContext } from "../../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VideoClipModalProps {
  context: VideoClipContext;
  onClose: () => void;
}

const VideoClipModal: React.FC<VideoClipModalProps> = ({ context, onClose }) => (
  <Dialog open onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="sm:max-w-[540px]">
      <DialogHeader>
        <DialogTitle>Video Clip — {context.zone}</DialogTitle>
        <p className="text-xs text-slate-500">{context.time} · Auto-retrieved from alert event</p>
      </DialogHeader>
      <div className="bg-slate-900 rounded-lg h-52 flex items-center justify-center border-2 border-dashed border-slate-700 mb-2">
        <div className="text-center">
          <Icon name="camera" size={40} color="#475569" />
          <div className="text-slate-400 text-sm mt-2">Clip: {context.time} — {context.zone}</div>
          <div className="text-slate-500 text-xs mt-1">Overhead sensor · 30-day retention</div>
          <div className="mt-3">
            <Badge variant="destructive" className="text-xs">● Playing</Badge>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-red-50 rounded border border-red-200 text-sm mb-2">
        <strong className="text-red-800">{context.message}</strong>
        <p className="text-slate-500 text-xs mt-1">{context.detail}</p>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1">Export coaching package</Button>
        <Button variant="outline">Download clip</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default VideoClipModal;
