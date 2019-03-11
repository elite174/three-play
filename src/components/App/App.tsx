import React from 'react';
import { cn } from 'recn';

import './App.scss';
import { Scene } from '../Scene/Scene';

const cnApp = cn('App');

export const App = () => (
    <div className={cnApp()}>
        <Scene />
    </div>
);