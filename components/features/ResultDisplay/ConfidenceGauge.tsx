"use client"

type Props = {
  confidence: number
  size?: number
}

export default function ConfidenceGauge({ confidence, size = 140 }: Props) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = Math.PI * radius
  const offset = circumference * (1 - confidence)

  const color = confidence >= 0.7 ? "#22c55e" : confidence >= 0.4 ? "#eab308" : "#ef4444"
  const label = confidence >= 0.7 ? "High Confidence" : confidence >= 0.4 ? "Medium Confidence" : "Low Confidence"

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="oklch(0.87 0 0)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="dark:stroke-zinc-700"
        />
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
        <text
          x={size / 2}
          y={size / 2 - 4}
          textAnchor="middle"
          fill="currentColor"
          fontSize={28}
          fontWeight={700}
          className="dark:fill-zinc-100"
        >
          {(confidence * 100).toFixed(0)}%
        </text>
        <text
          x={size / 2}
          y={size / 2 + 14}
          textAnchor="middle"
          fill="oklch(0.55 0 0)"
          fontSize={10}
          className="dark:fill-zinc-400"
        >
          confidence
        </text>
      </svg>
      <span className="text-xs font-medium mt-2" style={{ color }}>
        {label}
      </span>
    </div>
  )
}
