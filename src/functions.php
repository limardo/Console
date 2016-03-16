<?php

if (!function_exists('console_setup')):
    function console_setup()
    {
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        // Controllare
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));

        remove_filter('the_content', 'wpautop');
    }
endif;
add_action('after_setup_theme', 'console_setup');

if (!function_exists('console_scripts')):
    function console_scripts()
    {
        wp_enqueue_style('console-style', get_stylesheet_uri());
        wp_enqueue_script('console-script', get_template_directory_uri() . '/js/console-theme.js', array('jquery'), '20160313', true);
        wp_localize_script('console-script', 'WP_API_Settings', array('root' => esc_url_raw(rest_url()), 'nonce' => wp_create_nonce('wp_rest')));
    }
endif;
add_action('wp_enqueue_scripts', 'console_scripts', 100);

if (!function_exists('console_the_header')):
    function console_the_header()
    {
        $text = get_theme_mod('console_header');
        echo $text;
    }
endif;

require get_template_directory() . '/inc/customizer.php';