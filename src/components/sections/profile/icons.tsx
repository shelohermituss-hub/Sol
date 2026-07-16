// Ré-export de composants Phosphor pré-dimensionnés, pour garder les points
// d'appel (`<PersonIcon />`) inchangés — cf. CLAUDE.md, choix Phosphor Icons.
import {
  User,
  LinkSimple,
  Shield,
  Star,
  UsersThree,
  ChartLineUp,
  Bell,
  FileText,
  Question,
  DeviceMobile,
} from "@phosphor-icons/react/ssr";

export const PersonIcon = () => <User size={22} />;
export const LinkIcon = () => <LinkSimple size={22} />;
export const ShieldIcon = () => <Shield size={22} />;
export const StarIcon = () => <Star size={22} weight="fill" />;
export const PeopleIcon = () => <UsersThree size={22} />;
export const LimitsIcon = () => <ChartLineUp size={22} />;
export const BellIconOutline = () => <Bell size={22} />;
export const DocumentIcon = () => <FileText size={22} />;
export const HelpIcon = () => <Question size={22} />;
export const PhoneIcon = () => <DeviceMobile size={20} color="white" />;
