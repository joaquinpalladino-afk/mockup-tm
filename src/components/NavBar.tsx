'use client'

import React, { useState, useEffect } from 'react';
import { BellIcon, PersonIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';
import { motion, AnimatePresence } from 'framer-motion';

const NavButton = ({ children, className, ...props }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button variant="soft" className={`nav-button ${className}`} {...props}>
      {children}
    </Button>
  </motion.div>
);

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${hasScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Text className="brand-text">Loomtask</Text>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden md:flex">
          <NavButton>New Task</NavButton>
          <NavButton>Your Tasks</NavButton>
        </div>

        <div className="navbar-right hidden md:flex">
          {/* User and Notifications are now in the side menu */}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden navbar-right">
          <Button variant="soft" onClick={() => setIsMenuOpen(true)} className="nav-button">
            <HamburgerMenuIcon width="20" height="20" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-backdrop"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mobile-menu"
            >
              <div className="mobile-menu-header">
                <Text className="brand-text">Loomtask</Text>
                <Button variant="soft" onClick={() => setIsMenuOpen(false)} className="nav-button">
                  <Cross1Icon width="20" height="20" />
                </Button>
              </div>
              <NavButton>New Task</NavButton>
              <NavButton>Your Tasks</NavButton>
              <NavButton>
                <BellIcon width="20" height="20" />
                <span className="user-text">Notifications</span>
              </NavButton>
              <NavButton className="user-button">
                <PersonIcon width="20" height="20" />
                <span className="user-text">User</span>
              </NavButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;