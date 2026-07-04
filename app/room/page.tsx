import { EssenceProvider } from "@/features/essence/components/EssenceProvider";
import MysticRoom from "@/features/mystic-room/components/MysticRoom";

export default function RoomPage() {
  return (
    <EssenceProvider>
      <MysticRoom />
    </EssenceProvider>
  );
}