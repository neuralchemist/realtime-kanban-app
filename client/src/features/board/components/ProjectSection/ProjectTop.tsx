import { useEffect, useRef, useState } from "react";
//👇🏻 mui config
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Tooltip from "@mui/material/Tooltip";
//👇🏻 React-copy-to-clipboard config
import { CopyToClipboard } from "react-copy-to-clipboard";
// custom types
import { IProject } from "@entities/project/types";
// custom styles
import { StyledProjectTop } from "./styles";
// custom components
// custom context
import { useToast } from "@common/hooks";

interface Props {
  projectId: IProject["_id"];
}

export function ProjectTop({ projectId }: Props) {
  console.log('%cProjectiTop', 'color: red')
  const [isCopied, setIsCopied] = useState(false);
  const { setToastState } = useToast();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // get the current location (URL)
  const pathname = window.location.href;

  //👇🏻 This function runs immediately the content is copied
  const handleCopyLink = () => {
    // ignore if isCoppied = true
    if (isCopied) return undefined;

    setIsCopied(true);
    timerRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDelete = () => {
    setToastState({
      isToastOpen: true,
      toastMessage: "deleted project : Sorry no can do",
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <StyledProjectTop>
      <CopyToClipboard text={pathname} onCopy={handleCopyLink}>
        <IconButton disabled={isCopied}>
          {isCopied ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <Tooltip title="copy link" arrow>
              <ContentCopyIcon color="info" />
            </Tooltip>
          )}
        </IconButton>
      </CopyToClipboard>
      <IconButton color="error" onClick={handleDelete}>
        <DeleteOutlinedIcon />
      </IconButton>
    </StyledProjectTop>
  );
}
