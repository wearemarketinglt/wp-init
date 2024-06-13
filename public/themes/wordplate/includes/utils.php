<?php

// HTMX AJAX URL

function hx($action = false, $params = []) {
    return admin_url( 'admin-ajax.php' ) . ($action ? '?action=' . $action : '') . ($params ? '&' . http_build_query($params) : '');
}


// SENTENCE STRINGIFY

function stringify($string) {
    $string = preg_replace('/[^A-Za-z0-9\-]/', ' ', $string);
    
    if(is_numeric(substr($string, 0, 1))) {
        $string = '_' . $string;
    }

    return str_replace(' ', '-', strtolower($string));
}


// GET WPML LANG

function get_lang() {
    return apply_filters( 'wpml_current_language', null );
}
add_shortcode( 'language', 'get_language_shortcode' );


// GET WPML PERMALINK

function get_wpml_permalink($id) {
    return apply_filters( 'wpml_object_id', $id, 'attachment', FALSE, get_lang() );
}


// READING TIME

function reading_time($id = false, $content = false) {
    if (!$id && !$content) {
        $id = get_the_ID();
        $content = get_post_field( 'post_content', $id );
    }

    $word_count = str_word_count( strip_tags( $content ) );
    $readingtime = ceil($word_count / 200);

    $totalreadingtime = $readingtime;
    
    return $totalreadingtime;
}