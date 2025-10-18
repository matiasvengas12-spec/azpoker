import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href?: string;
    variant?: 'primary' | 'secondary';
    target?: string;
    rel?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, variant = 'primary', ...props }) => {
    const baseClasses = "inline-block px-8 py-3 font-semibold rounded-lg shadow-lg transition-transform transform duration-300 hover:scale-105 focus:outline-none focus:ring-4";
    
    const variantClasses = {
        primary: "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 focus:ring-violet-400",
        secondary: "bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500",
    };

    const className = `${baseClasses} ${variantClasses[variant]}`;

    if (href) {
        return (
            <a href={href} className={className} target={props.target} rel={props.rel}>
                {children}
            </a>
        );
    }

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;