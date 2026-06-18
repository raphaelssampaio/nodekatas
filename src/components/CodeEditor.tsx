'use client';

import { useEffect, useRef } from 'react';
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  highlightSpecialChars,
  drawSelection,
} from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

interface Props {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

function normalizeValue(value: string): string {
  return value.replace(/__fill_me__/g, '// your code here');
}

export default function CodeEditor({ value, onChange, readOnly = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editableCompartment = useRef(new Compartment());

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: normalizeValue(value),
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightSpecialChars(),
          drawSelection(),
          javascript(),
          oneDark,
          editableCompartment.current.of(EditorView.editable.of(!readOnly)),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString());
            }
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => view.destroy();
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const normalized = normalizeValue(value);
    if (view.state.doc.toString() === normalized) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: normalized },
    });
  }, [value]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: editableCompartment.current.reconfigure(EditorView.editable.of(!readOnly)),
    });
  }, [readOnly]);

  return <div ref={containerRef} />;
}
