<?php

class Console_Customize
{

    public static function register($wp_customize)
    {
        $wp_customize->add_section('console_options',
            array(
                'title' => __('Console Options', 'console'),
                'priority' => 35,
                'capability' => 'edit_theme_options',
                'description' => __('Allows you to customize some example settings for console.', 'Console')
            )
        );

        $wp_customize->add_setting('console_header',
            array(
                'default' => '',
                'type' => 'theme_mod',
                'capability' => 'edit_theme_options',
                'transport' => 'postMessage'
            )
        );

        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'console_header_textarea',
                array(
                    'label' => __('Header text', 'console'),
                    'section' => 'console_options',
                    'settings' => 'console_header',
                    'type' => 'textarea'
                )
            )
        );

        $wp_customize->get_setting('blogname')->transport = 'postMessage';
        $wp_customize->get_setting('blogdescription')->transport = 'postMessage';
        $wp_customize->get_setting('header_textcolor')->transport = 'postMessage';
        $wp_customize->get_setting('background_color')->transport = 'postMessage';
    }
}

add_action('customize_register', array('Console_Customize', 'register'));
