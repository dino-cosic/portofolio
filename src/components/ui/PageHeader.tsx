import { motion } from 'framer-motion';
import React from 'react';

interface PageHeaderProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    showAnimation?: boolean;
    headerClassName?: string;
}

export function PageHeader({
    title,
    subtitle,
    showAnimation = true,
    headerClassName = 'page-header',
}: PageHeaderProps) {
    if (!showAnimation) {
        return (
            <div className={headerClassName}>
                {title && <h1>{title}</h1>}
                {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
        );
    }

    return (
        <motion.div
            className={headerClassName}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {title && <h1>{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </motion.div>
    );
}
