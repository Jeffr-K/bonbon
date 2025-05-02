import React, { ReactNode } from 'react';

interface AdminComponentProps {
  children: ReactNode;
  className?: string;
}

interface AdminButtonProps extends AdminComponentProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  [key: string]: any;
}

interface AdminBadgeProps extends AdminComponentProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function AdminContainer({ children, className = '' }: AdminComponentProps) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

export function AdminHeader({ children, className = '' }: AdminComponentProps) {
  return (
    <div className={`flex justify-between items-center mb-8 ${className}`}>
      {children}
    </div>
  );
}

export function AdminTitle({ children, className = '' }: AdminComponentProps) {
  return (
    <h1 className={`text-2xl font-semibold text-slate-800 ${className}`}>
      {children}
    </h1>
  );
}

export function AdminButton({ children, onClick, variant = 'primary', className = '', ...props }: AdminButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors text-sm";
  
  const variantClasses: { [key: string]: string } = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "bg-white border border-orange-500 text-orange-500 hover:bg-orange-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminCard({ children, className = '' }: AdminComponentProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function AdminTable({ children, className = '' }: AdminComponentProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function AdminTableHead({ children }: AdminComponentProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {children}
      </tr>
    </thead>
  );
}

export function AdminTableBody({ children }: AdminComponentProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
}

export function AdminTableHeader({ children, className = '' }: AdminComponentProps) {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

export function AdminTableCell({ children, className = '' }: AdminComponentProps) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
}

export function AdminBadge({ children, variant = 'default', className = '' }: AdminBadgeProps) {
  const variantClasses: { [key: string]: string } = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}