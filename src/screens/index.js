import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';
import AuthLoading from './authloading';
import SignIn from './signin';
import SignUp from './signup';
import Settings from './settings';
import New from './newnote';
import Edit from './edit'

// Navigation Stack
const AuthStack = createStackNavigator({
    SignIn: SignIn,
    SignUp: SignUp
});

const FeedStack = createStackNavigator({
    Feed: Feed,
    Note: NoteScreen,
    New: New,
    Edit: Edit
});

const MyStack = createStackNavigator({
    MyNotes: MyNotes,
    Note: NoteScreen
});

const FavStack = createStackNavigator({
    Favorites: Favorites,
    Note: NoteScreen
});

const SettingsStack = createStackNavigator({
    Settings: Settings,
});

// Navigation Tabs
const TabNavigator = createBottomTabNavigator({
    FeedScreen: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={24} color={tintColor} />
            )
        }
    },

    MyNoteScreen: {
        screen: MyStack,
        navigationOptions: {
            tabBarLabel: 'My Notes',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="note-multiple" size={18} color={tintColor} />
            )
        }
    },

    FavoriteScreen: {
        screen: FavStack,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="star" size={24} color={tintColor} />
            )
        }
    },

    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="account" size={24} color={tintColor} />
            )
        }
    },

});

const SwitchNavigator = createSwitchNavigator (
    {
        AuthLoading: AuthLoading,
        Auth: AuthStack,
        App: TabNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
)


export default createAppContainer(SwitchNavigator);