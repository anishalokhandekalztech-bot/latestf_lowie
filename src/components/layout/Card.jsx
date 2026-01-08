import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ id, selected, onClick, currentAnimation }) => {
  return (
    <motion.div
      className={`card ${selected ? 'selected' : ''}`}
      onClick={() => onClick(id)}
      animate={currentAnimation?.animate || {}}
      transition={currentAnimation?.transition || {}}
      style={{
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        cursor: 'pointer'
      }}
    >
      <h3>Card {id}</h3>
    </motion.div>
  );
};

export default Card;