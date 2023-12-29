import css from "./DialogBox.module.css";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type DialogPropType = {
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
};

export const CustomDialog = ({
  title,
  content,
  actions,
  onClose,
}: DialogPropType) => (
  <div className={css["dialog-overlay"]}>
    <div className={css["dialog-container"]}>
      <div className={css["dialog-header"]}>
        <h2 className={css["dialog-title"]}>{title}</h2>
        <IconButton
          sx={{
            marginLeft: "15px",
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div>{content}</div>
      <div className={css["dialog-actions"]}>{actions}</div>
    </div>
  </div>
);
