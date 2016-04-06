<?php

if (!function_exists('console_setup')):
    function console_setup()
    {
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        // Controllare
        add_theme_support('html5', [
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ]);

        remove_filter('the_content', 'wpautop');
    }
endif;
add_action('after_setup_theme', 'console_setup');

if (!function_exists('console_scripts')):
    function console_scripts()
    {
        wp_enqueue_style('console-style', get_stylesheet_uri());
        wp_enqueue_script('console-script', get_template_directory_uri() . '/js/console-theme.js', ['jquery'], '20160313', true);
        wp_localize_script('console-script', 'WP_API_Settings', ['root' => esc_url_raw(rest_url()), 'nonce' => wp_create_nonce('wp_rest')]);
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

if (!function_exists('console_help_api')):
    function console_help_api()
    {
        register_rest_field('page', 'help', [
            'get_callback'   => 'console_get_post_meta_api',
            'update_callback'=> null,
            'schema'         => null
        ]);
    }
endif;
add_action('rest_api_init', 'console_help_api');

if (!function_exists('console_get_post_meta_api')):
    function console_get_post_meta_api($object, $field_name, $request)
    {
        return get_post_meta($object['id'], $field_name, true);
    }
endif;

require get_template_directory() . '/inc/customizer.php';
