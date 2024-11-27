// src/components/EmptyState.js
import React from 'react';

const EmptyState = () => (
    <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task</p>
    </div>
);

export default EmptyState;