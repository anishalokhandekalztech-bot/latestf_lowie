import React, { useState, useRef } from 'react';
import { DuplicateIcon } from '../../Actions/FloatingBar/Duplicate';
import { EditTextCode } from '../../Actions/FloatingBar/EditTextCode';
import { LightDarkMode } from '../../Actions/FloatingBar/LightDarkMode';
import { StylesIcon } from '../../Actions/FloatingBar/Styles';
import { UploadImageIcon } from '../../Actions/FloatingBar/UploadImage';
import { AddContainer } from '../../Actions/FloatingBar/AddContainer';
import { AddText } from '../../Actions/FloatingBar/AddText';
import { DeletingIcon } from '../../Actions/FloatingBar/DeleteIcon';
import '../../index.css';

const ICONS = [
  { key: 'addContainer', component: <AddContainer />, label: 'Add Container' },
  { key: 'duplicate', component: <DuplicateIcon />, label: 'Duplicate' },
  { key: 'delete', component: <DeletingIcon />, label: 'Delete' },
  { key: 'addText', component: <AddText />, label: 'Add Text' },
  { key: 'editText', component: <EditTextCode />, label: 'Edit Text' },
  { key: 'styles', component: <StylesIcon />, label: 'Styles' },
  { key: 'uploadImage', component: <UploadImageIcon />, label: 'Upload Image' },
  { key: 'lightDarkMode', component: <LightDarkMode />, label: 'Light / Dark Mode' },
];

const PANEL_ICONS = ['addText', 'editText', 'styles', 'uploadImage'];

function FloatingBar({ 
  onAddContainer, 
  onDuplicate, 
  onDeleteCard, 
  selectedCards = [], 
  onSelectCard,
  onAddTextItem,
  onUpdateTextItem,
  onDeleteTextItem,
  onUploadImage,
  onDeleteImage,
  cards = [] 
}) {
  const [activePanel, setActivePanel] = useState(null);
  const [newText, setNewText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [styleInput, setStyleInput] = useState({
    backgroundColor: '#101010',
    borderRadius: 16,
    textColor: '#ffffff',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    padding: 10,
    border: '2px solid transparent',
    borderColor: '#444444',
    boxShadow: 'none',
    opacity: 1,
    transform: 'scale(1)',
    transition: '0.3s ease',
  });

  const getCurrentCardTextItems = () => {
    if (selectedCards.length === 1) {
      const card = cards.find(c => c.id === selectedCards[0]);
      return card?.textItems || [];
    }
    return [];
  };

  const getCurrentCardStyles = () => {
    if (selectedCards.length === 1) {
      const card = cards.find(c => c.id === selectedCards[0]);
      if (card?.styleOverrides) {
        return {
          backgroundColor: card.styleOverrides.background || '#101010',
          borderRadius: parseInt(card.styleOverrides.borderRadius) || 16,
          textColor: card.styleOverrides.color || '#ffffff',
          fontSize: card.styleOverrides.fontSize ? parseInt(card.styleOverrides.fontSize) : 14,
          fontWeight: card.styleOverrides.fontWeight || 'normal',
          textAlign: card.styleOverrides.textAlign || 'center',
          padding: card.styleOverrides.padding ? parseInt(card.styleOverrides.padding) : 10,
          borderColor: card.styleOverrides.borderColor || '#444444',
          border: card.styleOverrides.border || '2px solid transparent',
          boxShadow: card.styleOverrides.boxShadow || 'none',
          opacity: card.styleOverrides.opacity || 1,
          transform: card.styleOverrides.transform || 'scale(1)',
          transition: card.styleOverrides.transition || '0.3s ease',
        };
      }
    }
    return styleInput;
  };

  const getCurrentCardImage = () => {
    if (selectedCards.length === 1) {
      const card = cards.find(c => c.id === selectedCards[0]);
      return card?.imageData || null;
    }
    return null;
  };

  const handleIconClick = (key) => {
    if (key === 'delete') {
      if (selectedCards.length === 0) {
        alert('Please select a card to delete');
        return;
      }
      if (typeof onDeleteCard === 'function') {
        onDeleteCard();
      }
      setActivePanel(null);
      return;
    }

    if (key === 'duplicate') {
      if (typeof onDuplicate === 'function') {
        onDuplicate();
      }
      setActivePanel(null);
      return;
    }

    if (key === 'addText') {
      if (selectedCards.length === 0) {
        alert('Please select a card to add text');
        return;
      }
      if (selectedCards.length > 1) {
        alert('Please select only one card to add text');
        return;
      }
      setNewText('');
      setEditingIndex(null);
      setActivePanel(key);
      return;
    }

    if (key === 'editText') {
      if (selectedCards.length === 0) {
        alert('Please select a card to edit text');
        return;
      }
      if (selectedCards.length > 1) {
        alert('Please select only one card to edit text');
        return;
      }
      setNewText('');
      setEditingIndex(null);
      setActivePanel(key);
      return;
    }

    if (key === 'styles') {
      if (selectedCards.length === 0) {
        alert('Please select a card to edit styles');
        return;
      }
      if (selectedCards.length > 1) {
        alert('Please select only one card to edit styles');
        return;
      }
      setStyleInput(getCurrentCardStyles());
      setActivePanel(key);
      return;
    }

    if (key === 'uploadImage') {
      if (selectedCards.length === 0) {
        alert('Please select a card to upload image');
        return;
      }
      if (selectedCards.length > 1) {
        alert('Please select only one card to upload image');
        return;
      }
      setImagePreview(getCurrentCardImage());
      setActivePanel(key);
      return;
    }

    if (PANEL_ICONS.includes(key)) {
      setActivePanel(key);
    } else {
      setActivePanel(null);

      if (key === 'addContainer' && typeof onAddContainer === 'function') {
        onAddContainer();
      }

      console.log(`${key} action triggered`);
    }
  };

  const handleClosePanel = () => {
    setActivePanel(null);
    setNewText('');
    setEditingIndex(null);
  };

  const handleAddText = () => {
    if (newText.trim() === '') {
      alert('Please enter some text');
      return;
    }
    if (typeof onAddTextItem === 'function') {
      onAddTextItem(newText);
    }
    setNewText('');
    handleClosePanel();
    // Deselect cards after adding text
    if (typeof onSelectCard === 'function') {
      onSelectCard([]);
    }
  };

  const handleStartEditText = (index) => {
    setEditingIndex(index);
    setNewText(getCurrentCardTextItems()[index] || '');
  };

  const handleSaveEditText = () => {
    if (newText.trim() === '') {
      alert('Please enter some text');
      return;
    }
    if (typeof onUpdateTextItem === 'function') {
      onUpdateTextItem(editingIndex, newText);
    }
    setNewText('');
    setEditingIndex(null);
    handleClosePanel();
    // Deselect cards after editing text
    if (typeof onSelectCard === 'function') {
      onSelectCard([]);
    }
  };

  const handleDeleteTextItem = (index) => {
    if (typeof onDeleteTextItem === 'function') {
      onDeleteTextItem(index);
    }
  };

  const handleStyleChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = value;

    if (type === 'number') {
      processedValue = parseFloat(value);
    }

    setStyleInput(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSaveStyles = () => {
    if (selectedCards.length !== 1) return;

    const styleChanges = {
      background: styleInput.backgroundColor,
      borderRadius: `${styleInput.borderRadius}px`,
      color: styleInput.textColor,
      fontSize: `${styleInput.fontSize}px`,
      fontWeight: styleInput.fontWeight,
      textAlign: styleInput.textAlign,
      padding: `${styleInput.padding}px`,
      borderColor: styleInput.borderColor,
      border: styleInput.border,
      boxShadow: styleInput.boxShadow,
      opacity: styleInput.opacity,
      transform: styleInput.transform,
      transition: styleInput.transition,
    };

    window.dispatchEvent(new CustomEvent('updateCardStyle', {
      detail: { cardId: selectedCards[0], styles: styleChanges }
    }));

    handleClosePanel();
    // Deselect cards after saving styles
    if (typeof onSelectCard === 'function') {
      onSelectCard([]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processImageFile(files[0]);
    }
  };

  const processImageFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setImagePreview(imageData);
      if (typeof onUploadImage === 'function') {
        onUploadImage(imageData);
      }
      // Deselect cards after uploading image
      if (typeof onSelectCard === 'function') {
        setTimeout(() => {
          onSelectCard([]);
        }, 100);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    if (typeof onDeleteImage === 'function') {
      onDeleteImage();
    }
    handleClosePanel();
    // Deselect cards after deleting image
    if (typeof onSelectCard === 'function') {
      onSelectCard([]);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        marginTop: "2vh",
        width: "max-content",
        minWidth: "30%",
        height: "6%",
        minHeight: "50px",
        backgroundColor: "#101010",
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        zIndex: 1000,
        position: "relative",
        fontWeight: "bold",
      }}
      className="Floatingbaricons"
    >
      <div className='Floatingbarinside'>
        {ICONS.map(icon => (
          <div 
            key={icon.key} 
            onClick={() => handleIconClick(icon.key)} 
            style={{ 
              cursor: 'pointer',
              opacity: (icon.key === 'delete' && selectedCards.length === 0) ? 0.5 : 
                       ((icon.key === 'addText' || icon.key === 'editText' || icon.key === 'styles' || icon.key === 'uploadImage') && selectedCards.length !== 1) ? 0.5 : 1,
              pointerEvents: (icon.key === 'delete' && selectedCards.length === 0) ? 'none' :
                           ((icon.key === 'addText' || icon.key === 'editText' || icon.key === 'styles' || icon.key === 'uploadImage') && selectedCards.length !== 1) ? 'none' : 'auto'
            }}
            title={icon.label}
          >
            {icon.component}
          </div>
        ))}
      </div>

      {activePanel && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            minWidth: '420px',
            maxHeight: '600px',
            overflowY: 'auto',
            background: '#222',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            padding: '20px',
            zIndex: 2000,
          }}
        >
          <button
            style={{
              position: 'absolute',
              paddingRight: '8px',
              paddingTop: '3px',
              top: '10px',
              right: '10px',
              background: 'transparent',
              color: '#fff',
              fontSize: '1.5em',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={handleClosePanel}
            aria-label="Close"
          >
            ×
          </button>

          <div style={{ marginTop: '20px' }}>
            {/* Upload Image Section */}
            {activePanel === 'uploadImage' && (
              <div>
                <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '15px' }}>Upload Image</h3>
                
                {imagePreview ? (
                  <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                    <img 
                      src={imagePreview} 
                      alt="preview" 
                      style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        objectFit: 'contain'
                      }}
                    />
                    <p style={{ color: '#aaa', fontSize: '12px', marginTop: '10px' }}>
                      Image uploaded successfully
                    </p>
                  </div>
                ) : null}

                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  style={{
                    border: dragActive ? '2px solid #007bff' : '2px dashed #666',
                    borderRadius: '8px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    backgroundColor: dragActive ? 'rgba(0, 123, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '15px',
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <p style={{ color: '#fff', margin: '10px 0', fontWeight: 'bold' }}>
                    Drag and drop your image here
                  </p>
                  <p style={{ color: '#aaa', fontSize: '12px', margin: '10px 0' }}>
                    or click to select from computer
                  </p>
                  <p style={{ color: '#999', fontSize: '11px', margin: '10px 0' }}>
                    Supported: JPG, PNG, GIF, WebP (Max 5MB)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Choose File
                  </button>
                  {imagePreview && (
                    <button
                      onClick={handleDeleteImage}
                      style={{
                        flex: 1,
                        padding: '10px 15px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      Remove Image
                    </button>
                  )}
                </div>

                <button
                  onClick={handleClosePanel}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Done
                </button>
              </div>
            )}

            {/* Add Text Section */}
            {activePanel === 'addText' && (
              <div>
                <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '15px' }}>Add New Text</h3>
                <label style={{ display: 'block', marginBottom: '10px', color: '#fff', fontSize: '12px' }}>
                  Enter text to add below current text:
                </label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #444',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Enter new text..."
                />
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleAddText}
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Add Text
                  </button>
                  <button
                    onClick={handleClosePanel}
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      backgroundColor: '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Edit Text Section */}
            {activePanel === 'editText' && (
              <div>
                <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '15px' }}>Edit Text Items</h3>
                
                {getCurrentCardTextItems().length === 0 ? (
                  <p style={{ color: '#aaa' }}>No text items to edit. Use "Add Text" to add text.</p>
                ) : (
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {getCurrentCardTextItems().map((text, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: '15px',
                          padding: '10px',
                          backgroundColor: '#1a1a1a',
                          borderRadius: '8px',
                          border: editingIndex === idx ? '2px solid #007bff' : '1px solid #444',
                        }}
                      >
                        {editingIndex === idx ? (
                          <>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#fff', fontSize: '12px' }}>
                              Text {idx + 1}:
                            </label>
                            <textarea
                              value={newText}
                              onChange={(e) => setNewText(e.target.value)}
                              style={{
                                width: '100%',
                                height: '60px',
                                padding: '8px',
                                borderRadius: '6px',
                                backgroundColor: '#0d0d0d',
                                color: '#fff',
                                border: '1px solid #333',
                                fontFamily: 'inherit',
                                fontSize: '13px',
                                boxSizing: 'border-box',
                                marginBottom: '10px',
                              }}
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={handleSaveEditText}
                                style={{
                                  flex: 1,
                                  padding: '6px 10px',
                                  backgroundColor: '#28a745',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingIndex(null)}
                                style={{
                                  flex: 1,
                                  padding: '6px 10px',
                                  backgroundColor: '#6c757d',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p style={{ color: '#fff', margin: '0 0 8px 0', wordBreak: 'break-word' }}>
                              <strong>Text {idx + 1}:</strong> {text}
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleStartEditText(idx)}
                                style={{
                                  flex: 1,
                                  padding: '6px 10px',
                                  backgroundColor: '#007bff',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTextItem(idx)}
                                style={{
                                  flex: 1,
                                  padding: '6px 10px',
                                  backgroundColor: '#dc3545',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleClosePanel}
                  style={{
                    width: '100%',
                    marginTop: '15px',
                    padding: '10px 15px',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Close
                </button>
              </div>
            )}

            {/* Styles Section */}
            {activePanel === 'styles' && (
              <div>
                <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '15px' }}>Card Styles</h3>

                {/* Background Color */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Background Color:
                  </label>
                  <input
                    type='color'
                    name='backgroundColor'
                    value={styleInput.backgroundColor}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      height: '35px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Text Color */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Text Color:
                  </label>
                  <input
                    type='color'
                    name='textColor'
                    value={styleInput.textColor}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      height: '35px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Border Radius */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Border Radius: {styleInput.borderRadius}px
                  </label>
                  <input
                    type='range'
                    name='borderRadius'
                    min='0'
                    max='50'
                    value={styleInput.borderRadius}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Font Size */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Font Size: {styleInput.fontSize}px
                  </label>
                  <input
                    type='range'
                    name='fontSize'
                    min='10'
                    max='48'
                    value={styleInput.fontSize}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Font Weight */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Font Weight:
                  </label>
                  <select
                    name='fontWeight'
                    value={styleInput.fontWeight}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: '1px solid #444',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='normal'>Normal</option>
                    <option value='bold'>Bold</option>
                    <option value='600'>Semi-Bold</option>
                    <option value='lighter'>Lighter</option>
                  </select>
                </div>

                {/* Text Align */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Text Alignment:
                  </label>
                  <select
                    name='textAlign'
                    value={styleInput.textAlign}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: '1px solid #444',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='left'>Left</option>
                    <option value='center'>Center</option>
                    <option value='right'>Right</option>
                    <option value='justify'>Justify</option>
                  </select>
                </div>

                {/* Padding */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Padding: {styleInput.padding}px
                  </label>
                  <input
                    type='range'
                    name='padding'
                    min='0'
                    max='50'
                    value={styleInput.padding}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Border Color */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Border Color:
                  </label>
                  <input
                    type='color'
                    name='borderColor'
                    value={styleInput.borderColor}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      height: '35px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Border Style */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Border Style:
                  </label>
                  <select
                    name='border'
                    value={styleInput.border}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: '1px solid #444',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='2px solid transparent'>None</option>
                    <option value='2px solid'>Solid</option>
                    <option value='2px dashed'>Dashed</option>
                    <option value='2px dotted'>Dotted</option>
                    <option value='2px double'>Double</option>
                  </select>
                </div>

                {/* Box Shadow */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Box Shadow:
                  </label>
                  <select
                    name='boxShadow'
                    value={styleInput.boxShadow}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: '1px solid #444',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='none'>None</option>
                    <option value='0 4px 6px rgba(0,0,0,0.3)'>Soft</option>
                    <option value='0 10px 20px rgba(0,0,0,0.5)'>Medium</option>
                    <option value='0 20px 30px rgba(0,0,0,0.7)'>Strong</option>
                    <option value='0 0 10px rgba(255,215,0,0.5)'>Golden Glow</option>
                    <option value='0 0 15px rgba(0,191,255,0.5)'>Blue Glow</option>
                  </select>
                </div>

                {/* Opacity */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Opacity: {(styleInput.opacity * 100).toFixed(0)}%
                  </label>
                  <input
                    type='range'
                    name='opacity'
                    min='0'
                    max='1'
                    step='0.1'
                    value={styleInput.opacity}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Transform Scale */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Scale: {styleInput.transform}
                  </label>
                  <select
                    name='transform'
                    value={styleInput.transform}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: '1px solid #444',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='scale(1)'>Normal (1x)</option>
                    <option value='scale(1.1)'>1.1x</option>
                    <option value='scale(1.2)'>1.2x</option>
                    <option value='scale(0.9)'>0.9x</option>
                    <option value='scale(0.8)'>0.8x</option>
                  </select>
                </div>

                {/* Transition */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '12px' }}>
                    Transition:
                  </label>
                  <select
                    name='transition'
                    value={styleInput.transition}
                    onChange={handleStyleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: '1px solid #444',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='none'>None</option>
                    <option value='0.2s ease'>Fast (0.2s)</option>
                    <option value='0.3s ease'>Normal (0.3s)</option>
                    <option value='0.5s ease'>Slow (0.5s)</option>
                    <option value='1s ease'>Very Slow (1s)</option>
                  </select>
                </div>

                {/* Save Buttons */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleSaveStyles}
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Apply Styles
                  </button>
                  <button
                    onClick={handleClosePanel}
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      backgroundColor: '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {activePanel === 'uploadImage' && <div>Upload Image Section</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export { FloatingBar };
