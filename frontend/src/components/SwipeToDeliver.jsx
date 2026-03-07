import { Box, Typography } from "@mui/material";
import { motion, useMotionValue } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";

const SwipeToDeliver = ({ onComplete, swipeText, buttonBg }) => {
  const x = useMotionValue(0);
  const trackRef = useRef(null);

  const [trackWidth, setTrackWidth] = useState(320);


  const TRACK_HEIGHT = 56;
  const KNOB_SIZE = 46;


  useLayoutEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const MAX_X = trackWidth - KNOB_SIZE - 8;



  return (
    <Box
      ref={trackRef}
      sx={{
        width: { xs: "100%", xl: 320 },
        height: TRACK_HEIGHT,
        borderRadius: 999,
        background:
          "linear-gradient(145deg, #e6e6e6, #ffffff)",
        boxShadow:
          "inset 3px 3px 6px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.9)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        px: 1,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Center text */}
      <Typography
        sx={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          color: "#777",
          fontWeight: 500,
          pointerEvents: "none",
        }}
      >
        {swipeText}
      </Typography>

      {/* Draggable knob */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: MAX_X }}
        style={{ x }} // ✅ ONLY motion value here
        onDragEnd={(e, info) => {
          if (info.offset.x > MAX_X * 0.85) {
            navigator.vibrate?.(40);
            onComplete();
          } else {
            x.set(0);
          }
        }}
        whileTap={{ scale: 1.15 }}
        initial={{ x: 0 }}
      >
        <Box
          sx={{
            width: KNOB_SIZE,
            height: KNOB_SIZE,
            borderRadius: "50%",
            background:
              buttonBg,
            boxShadow:
              "2px 2px 6px rgba(255, 255, 255, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 22,
            cursor: "grab",
          }}
        >
          ➜
        </Box>
      </motion.div>
    </Box>
  );
};

export default SwipeToDeliver;
