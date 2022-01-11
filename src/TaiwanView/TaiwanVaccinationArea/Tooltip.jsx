import styles from "./AreaChart.module.css";

export const Tooltip = ({ children }) => (
  <>
    <text
      className={styles.tooltipStroke}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={-10}
    >
      {children}
    </text>
    <text
      className={styles.tooltip}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={-10}
    >
      {children}
    </text>
  </>
);
