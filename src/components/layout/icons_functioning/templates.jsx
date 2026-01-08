import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_TEMPLATES = [
	{
		id: 'bounce-card',
		name: 'Bounce Card',
		description: 'Simple vertical bounce',
		animation: {
			initial: { y: 0 },
			animate: { y: [0, -10, 0] },
			transition: { repeat: Infinity, duration: 0.6 },
		},
	},
	{
		id: 'spin-pulse',
		name: 'Spin & Pulse',
		description: 'Rotate + subtle scale pulse',
		animation: {
			initial: { rotate: 0, scale: 1 },
			animate: { rotate: 360, scale: [1, 1.04, 1] },
			transition: {
				rotate: { repeat: Infinity, duration: 1.8, ease: 'linear' },
				scale: { repeat: Infinity, duration: 1 },
			},
		},
	},
	{
		id: 'float',
		name: 'Float',
		description: 'Gentle floating motion',
		animation: {
			initial: { y: 0 },
			animate: { y: [0, -6, 0] },
			transition: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
		},
	},
	{
		id: 'shake',
		name: 'Shake',
		description: 'Quick horizontal shake',
		animation: {
			initial: { x: 0 },
			animate: { x: [0, -6, 6, -4, 4, 0] },
			transition: { repeat: Infinity, duration: 0.6 },
		},
	},
];

export default function Templates({ onApplyTemplate = () => {} }) {
	const [query, setQuery] = useState('');
	const templates = useMemo(() => DEFAULT_TEMPLATES, []);
	const filtered = useMemo(
		() =>
			templates.filter(t =>
				t.name.toLowerCase().includes(query.trim().toLowerCase())
			),
		[templates, query]
	);

	return (
		<div
			style={{
				color: '#fff',
				display: 'flex',
				flexDirection: 'column',
				gap: 8,
				fontSize: 13,
				padding: 8,
				boxSizing: 'border-box',
				// keep panel from growing too tall and force inner scrolling
				maxHeight: '60vh',
				minHeight: '160px',
				width: '100%',
				background: 'transparent',
				overflow: 'hidden',
			}}
		>
			{/* Heading */}
			<div
				style={{
					background: '#0b0b0b',
					padding: '8px 10px',
					borderRadius: 6,
					fontWeight: 700,
					fontSize: 14,
				}}
			>
				Templates
			</div>

			{/* Search */}
			<div style={{ display: 'flex', gap: 6 }}>
				<input
					aria-label="Search templates"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="Search templates..."
					style={{
						flex: 1,
						padding: '6px 8px',
						borderRadius: 6,
						border: '1px solid rgba(255,255,255,0.04)',
						background: '#111',
						color: '#fff',
						fontSize: 13,
					}}
				/>
				<button
					onClick={() => setQuery('')}
					style={{
						padding: '6px 8px',
						borderRadius: 6,
						border: 'none',
						background: '#2a2a2a',
						color: '#fff',
						cursor: 'pointer',
						fontSize: 13,
					}}
				>
					Clear
				</button>
			</div>

			{/* Scrollable content area */}
			<div
				style={{
					overflowY: 'auto',
					overflowX: 'hidden',
					paddingRight: 6,
					// fill remaining space in wrapper
					flex: 1,
					minHeight: 0,
				}}
			>
				{/* Grid of templates (small) */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
						gap: 8,
						alignItems: 'start',
					}}
				>
					{filtered.map(t => (
						<div
							key={t.id}
							style={{
								background: '#161616',
								padding: 8,
								borderRadius: 6,
								display: 'flex',
								flexDirection: 'column',
								gap: 6,
								boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
							}}
						>
							{/* live preview (small square) */}
							<motion.div
								initial={t.animation.initial}
								animate={t.animation.animate}
								transition={t.animation.transition}
								style={{
									width: '100%',
									aspectRatio: '1 / 1',
									minHeight: 48,
									maxHeight: 72,
									borderRadius: 6,
									background:
										'linear-gradient(135deg,#2a2a2a,#181818)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#fff',
									fontSize: 11,
									fontWeight: 600,
									overflow: 'hidden',
								}}
							>
								{t.name}
							</motion.div>

							<div style={{ fontSize: 11, color: '#ccc', minHeight: 22 }}>
								{t.description}
							</div>

							<div style={{ display: 'flex', gap: 6 }}>
								<button
									onClick={() => onApplyTemplate(t.animation)}
									style={{
										flex: 1,
										padding: '6px 8px',
										borderRadius: 6,
										border: 'none',
										background: '#007bff',
										color: '#fff',
										cursor: 'pointer',
										fontSize: 12,
									}}
								>
									Use
								</button>

								<button
									onClick={() => {}}
									style={{
										padding: '6px 8px',
										borderRadius: 6,
										border: '1px solid rgba(255,255,255,0.04)',
										background: 'transparent',
										color: '#fff',
										cursor: 'pointer',
										fontSize: 12,
									}}
								>
									Info
								</button>
							</div>
						</div>
					))}

					{filtered.length === 0 && (
						<div style={{ color: '#bbb', gridColumn: '1/-1', padding: 8 }}>
							No templates found.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}