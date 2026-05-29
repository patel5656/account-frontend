import React, { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'os_books_audit_logs';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Load all logs from localStorage */
function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Persist logs to localStorage */
function saveLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch {
    // storage quota exceeded – silently ignore
  }
}

/** Build a single audit-log entry */
function buildEntry({
  userName = 'Unknown User',
  userRole = 'User',
  actionType,          // 'Create' | 'Edit' | 'Delete'
  billNumber = '',
  moduleName = '',
  previousData = null,
  updatedData = null,
  ipAddress = '',
}) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userName,
    userRole,
    actionType,
    billNumber: String(billNumber),
    moduleName,
    previousData,
    updatedData,
    ipAddress,
    timestamp: new Date().toISOString(),
  };
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuditLogContext = createContext(null);

export function AuditLogProvider({ children }) {
  const [logs, setLogs] = useState(() => loadLogs());

  /**
   * Add a new audit-log entry.
   * @param {object} params - Same shape as buildEntry params.
   */
  const addLog = useCallback((params) => {
    const entry = buildEntry(params);
    setLogs((prev) => {
      const updated = [entry, ...prev];
      saveLogs(updated);
      return updated;
    });
    return entry;
  }, []);

  /** Clear all logs (admin action) */
  const clearLogs = useCallback(() => {
    setLogs([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuditLogContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </AuditLogContext.Provider>
  );
}

/** Hook to consume audit log context inside components */
export function useAuditLog() {
  const ctx = useContext(AuditLogContext);
  if (!ctx) {
    throw new Error('useAuditLog must be used inside <AuditLogProvider>');
  }
  return ctx;
}

// ─── Standalone helper (for use outside React components) ────────────────────

/**
 * Log an audit event directly to localStorage (no React context needed).
 * Call this from any page after a Create / Edit / Delete operation.
 *
 * @example
 * logAuditEvent({
 *   userName: 'Admin',
 *   userRole: 'Admin',
 *   actionType: 'Create',
 *   billNumber: 'INV-001',
 *   moduleName: 'Sales Invoice',
 *   previousData: null,
 *   updatedData: { total: 5000 },
 * });
 */
export function logAuditEvent(params) {
  const entry = buildEntry(params);
  const existing = loadLogs();
  saveLogs([entry, ...existing]);
  return entry;
}
